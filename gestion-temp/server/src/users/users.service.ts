import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { DraftedUserException } from './exceptions/draftedUser.exception';
import { IncorrectCredentialsException } from './exceptions/incorrectCredentials.exception';
import { EmailAlreadyExistsException } from './exceptions/emailAlreadyExists.exception';
import { IncorrectPasswordException } from './exceptions/IncorrectPasswordException';

@Injectable()
export class UsersService {
  saltOrRounds = 10;
  logger = new ConsoleLogger();

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //Creation du compte de l'utilisteur
  async create(createUserDto: CreateUserDto) {
    //Cryptage du mot de passe avec bcrypt
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );

    //Generation du matricule
    createUserDto.matricule = this.generateMatricule(5);

    //Assignation de la date actuelle
    createUserDto.date_inscription = Date().toString();

    //Assignation de l'etat a 1 (actif)
    createUserDto.etat = 1;

    //Création de l'utilisateur et enregistrement
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  //Authentification de l'utilisateur
  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOne(loginUserDto.email);

    //Verifier si l'utilisateur existe
    if (!user) {
      throw new UserNotFoundException();
    }

    //Verifier si l'utilisateur n'est pas archivé
    if (user.etat !== 1) {
      throw new DraftedUserException();
    }

    //Verifier si l'utilisateur a entré un mot de passe correct
    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new IncorrectCredentialsException();
    }
    //connexion réussie
    return { email: user.email, id: user._id, role: user.role };
  }

  //Recuperation de tous les utilisateur de la base
  async findAll() {
    return (await this.userModel.find().exec()).filter(
      (user) => user.etat === 1,
    );
  }

  //Recuperation de tous les utilisateur archive de la base
  async findAllArchive() {
    return (await this.userModel.find().exec()).filter(
      (user) => user.etat === 0,
    );
  }

  //Recuperation d'un utilisateur de la base à travers son email
  async findOne(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async findOneById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  //Modification d'un utilisateur à travers son id
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    const userExist = await this.findOne(updateUserDto.email);

    //Vérifier si le nouveau adresse email n'est pas déja associer à un autre compte
    if (userExist !== null && userExist.email !== user.email) {
      throw new EmailAlreadyExistsException();
    }

    //Modification de l'utilisateur
    return this.userModel.updateOne(
      { _id: id },
      {
        email: updateUserDto.email,
        nom: updateUserDto.nom,
        prenom: updateUserDto.prenom,
        date_modification: Date().toString(),
      },
    );
  }

  //Modification du mot de passe d'un utilisateur à travers son id
  async updatePassword(id: string, updateUserDto: any) {
    const user = await this.findOneById(id);
    //Verifier si l'utilisateur a entré un mot de passe correct
    const isPasswordCorrect = await bcrypt.compare(
      updateUserDto.ancienPassword,
      user.password,
    );

    if (!isPasswordCorrect) throw new IncorrectPasswordException();
    const password = await bcrypt.hash(
      updateUserDto.newPassword,
      this.saltOrRounds,
    );
    //Modification de l'utilisateur
    return this.userModel.updateOne(
      { _id: id },
      {
        password: password,
      },
    );
  }

  //Archivage d'un utilisateur à travers id
  remove(id: string) {
    return this.userModel.updateOne(
      { _id: id },
      {
        etat: 0,
        date_archivage: Date().toString(),
      },
    );
  }

  //Chercher un utilisateur par son matricule
  search(matricule: string) {
    return this.userModel.findOne({ matricule: matricule });
  }

  //Desarchivage d'un utilisateur à travers son identifiant
  restore(id: string) {
    return this.userModel.updateOne(
      { _id: id },
      {
        etat: 1,
        date_archivage: Date().toString(),
      },
    );
  }

  //Changer le role d'un utilisateur
  async switch(id: string) {
    //récupération de l'utilisateur, vérification de son role et changement du role
    const user = await this.findOneById(id);
    const role = user && user.role === 'admin' ? 'utilisateur' : 'admin';

    //enregistrement des modification dans la base de donnée
    return this.userModel.updateOne({ _id: id }, { role: role });
  }
  //Générer le matricule de l'utilisateur
  generateMatricule(length: number): string {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return 'MU2023/' + result;
  }
}
