module.exports = class AclMatrix {
    constructor(roles, resources, allows, matrix) {
        if (!(matrix.length === resources.length)) throw new Error('matrix.length should equal to resources.lenth');
        matrix.forEach(row => {
            if (!(row.length === roles.length)) throw new Error('length of each row should equal to roles.lenth');
            row.forEach(element => {
                if (!(element.length === allows.length)) throw new Error('length of each element should equal to allows.lenth');
            });
        });
        this.roles = roles;
        this.resources = resources;
        this.allows = allows;
        this.matrix = matrix;
    }

    isAllowed(role, resource, allow) {
        if (!this.roles.includes(role)) throw new Error('Provided role is not found in the roles array');
        if (!this.resources.includes(resource)) throw new Error('Provided resource is not found in the resources array');
        if (!this.allows.includes(allow)) throw new Error('Provided allow is not found in the allows array');
        const roleIndex = this.roles.indexOf(role);
        const resourceIndex = this.resources.indexOf(resource);
        const allowIndex = this.allows.indexOf(allow);
        return this.matrix[resourceIndex][roleIndex][allowIndex];
    }
}
