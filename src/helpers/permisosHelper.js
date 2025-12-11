
export const permisions = {
    product : ['create', 'read', 'update', 'delete'],
    user : ['create', 'read', 'update', 'delete'],
    admin : ['create', 'read', 'update', 'delete'],
};

export const roles = [ 'admin', 'user' ];

export const hasRole = (role) => {
    return roles.includes(role);
};


export const can = (resource, action) => {

    if(!permisions[resource]){
        return false;
    }

    return permisions[resource].includes(action);
}
    


