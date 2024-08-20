﻿import {makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/users";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Route";

export default class UserStore {
    user: User | null = null;
    
    constructor() {
        makeAutoObservable(this)
    }
    
    
    get isLoggedIn() {
        return !!this.user;
    }
    
    login = async (creds: UserFormValues)=> {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token)
        runInAction(() => this.user = user)
        router.navigate('/activities')
        store.modalStore.closeModal()
    }

    register = async (creds: UserFormValues)=> {
        const user = await agent.Account.register(creds);
        store.commonStore.setToken(user.token)
        runInAction(() => this.user = user)
        router.navigate('/activities')
        store.modalStore.closeModal()
    }

    logout = () => {
        store.commonStore.setToken(null)
        this.user = null
        router.navigate('/')
    }
    
    getUser = async  () => {
        const user = await agent.Account.current();
        runInAction(() => this.user = user)
    }
    
    setImage = (image: string) => {
        if (this.user) {
         this.user.image = image   
        }
    }
    
}