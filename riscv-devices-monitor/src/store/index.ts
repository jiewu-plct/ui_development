import { defineStore } from "pinia";
import { Role } from "../types";

export const useStore = defineStore({
    id: 'user',

    state: () => {
        return {
            role: 'Super Admin' as Role,
            isCollapsed: false as Boolean 
        }
    },

    getters: {

    },

    actions: {
        changeRole(role: Role) {
            this.role = role 
        },

        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed
        }
    }

})