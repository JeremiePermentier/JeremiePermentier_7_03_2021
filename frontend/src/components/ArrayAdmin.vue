<template>
    <div class="container">
        <div class="ctrl">
            <button :class="{active: users}" class="ctrl__btn" @click="seeAllUsers()">Utilisateurs</button>
            <button :class="{active: messages}" class="ctrl__btn" @click="seeAllMessages()">Messages</button>
            <button :class="{active: comments}" class="ctrl__btn"  @click="seeAllComments()">commentaires</button>
        </div>
        <div class="table__container">
            <table v-if="users" class="tableUsers">
                <thead>
                    <tr>
                        <th data-label="Id" scope="col">Id</th>
                        <th data-label="Pseudo" scope="col">Pseudo</th>
                        <th data-label="Email" scope="col">Email</th>
                        <th data-label="Rôle" scope="col">Rôle</th>
                        <th data-label="Message" scope="col">Message</th>
                        <th data-label="Commentaire" scope="col">Commentaire</th>
                        <th data-label="Voir le profil" scope="col">Voir le profil</th>
                        <th data-label="Supprimer" scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in infos" :key="info.data">
                        <td>{{ info.id }}</td>
                        <td>{{ info.pseudo }}</td>
                        <td>{{ info.email }}</td>
                        <td>{{ role(info.isAdmin) }}</td>
                        <td>{{ info.Messages.length }}</td>
                        <td>{{ info.Comments.length }}</td>
                        <td><i @click="seeUser(info.id)" title="voir le profil" class="far fa-eye"></i></td>
                        <td><i @click="deleteUser(info.id)" title="Supprimer ce profil" class="fas fa-trash-alt"></i></td>
                    </tr>
                </tbody>
        </table>
        </div>
        <table v-if="messages">
            <thead>
                <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Pseudo</th>
                    <th scope="col">Message</th>
                    <th scope="col">Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in infos" :key="info.data">
                    <td>{{ info.id }}</td>
                    <td>{{ info.pseudo }}</td>
                    <td>{{ info.title }}</td>
                    <td><i @click="deleteMessage(info.id)" title="Supprimer ce profil" class="fas fa-trash-alt"></i></td>
                </tr>
            </tbody>
        </table>
        <table v-if="comments">
            <thead>
                <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Pseudo</th>
                    <th scope="col">Commentaires</th>
                    <th scope="col">Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in infos" :key="info.data">
                    <td>{{ info.id }}</td>
                    <td>{{ info.pseudo }}</td>
                    <td>{{ info.comment }}</td>
                    <td><i @click="deleteComment(info.id)" title="Supprimer ce profil" class="fas fa-trash-alt"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'arrayAdmin',
        data(){
            return {
                infos: '',
                users: false,
                messages: false,
                comments: false
            }
        },
        methods:{
            seeUser(id){
                this.$router.push(`admin/${id}`)
            },
            seeAllUsers(){
                axios.get('http://localhost:3000/api/users/profil')
                .then(res => {
                    this.infos = res.data
                    this.users = true
                    this.messages = false
                    this.comments = false;
                })
                .catch(err => console.log(err))
            },
            seeAllMessages(){
                axios.get('http://localhost:3000/api/message')
                .then(res => {
                    this.infos = res.data;
                    this.messages = true;
                    this.users = false;
                    this.comments = false;
                })
                .catch(error => console.log(error))
            },
            seeAllComments(){
                axios.get('http://localhost:3000/api/comment')
                .then(res => {
                    this.infos = res.data;
                    this.comments = true
                    this.messages = false
                    this.users = false;
                })
                .catch(error => console.log(error))
            },
            deleteUser(id){
                axios.delete(`http://localhost:3000/api/users/profil/${id}`)
                .then(() => {
                    this.refresh('users/profil')
                })
                .catch(err => {
                    console.error(err)
                })
            },
            deleteComment(id){
                axios.delete(`http://localhost:3000/api/comment/${id}`)
                .then(() => {
                    this.refresh('comment')
                })
                .catch(err => {
                    console.error(err)
                })
            },
            deleteMessage(id){
                axios.delete(`http://localhost:3000/api/message/${id}`)
                .then(() => {
                    this.refresh('message')
                })
                .catch(err => {
                    console.error(err)
                })
            },
            role(isAdmin){
                if (isAdmin === true ){
                    return "admin"
                } else {
                    return "normal"
                }
            },
            refresh(url){
                axios.get(`http://localhost:3000/api/${url}`)
                .then(res => {
                console.log(res)
                this.infos = res.data
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

.container{
    margin:  5rem auto;
}
.ctrl{
    margin: 1rem auto;
    width: fit-content;
    &__btn{
        @include btn($border-radius: 0px, $background: $color-text, $border: $color-text);
    }
}
.active{
            @include btn($border-radius: 0px, $background: $color-primary, $border: $color-primary);
        }
table, td, th{
    margin: auto;
    padding: 0.5rem;
    border-collapse: collapse;
    border: 1px solid $color-primary;
    text-align: center;
}
th{
    background: $color-primary;
    color: #fff;
}
@media screen and (max-width: 800px) {
    .table__container{
    overflow: scroll;
    }
}
.tableUsers tr:nth-child(even){
    background: #f2f2f2;
}
</style>