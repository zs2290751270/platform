import {createRouter, createWebHashHistory} from "vue-router";
import member from "../views/race/member";


const router = createRouter({
    history: createWebHashHistory('/iAmIgnored'),
    routes : [
        {
            path: '/',
            name: 'member',
            component: member
        }
    ]
})

export default router