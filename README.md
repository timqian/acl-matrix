# acl-matrix

## Usage

1. Install
```bash
npm install acl-matrix
```
2. Require it
```js
const AclMatrix = require('acl-matrix');

const roles = ['admin', 'member', 'guest'];
const resources = ['blog', 'comment'];
const allows = ['get', 'add', 'update', 'delete'];

// Each element in matrix stores the permissions of a role to a resource.
const matrix = [
    //   admin        member         guest
    [[1, 1, 1, 1], [1, 0, 1, 1], [1, 0, 0, 0]], // blog
    [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], // comment
];

const acl = new AclMatrix(roles, resources, allows, matrix);

// 0
acl.isAllowed('member', 'blog', 'add');

// 1
acl.isAllowed('member', 'blog', 'get');
```

## Concepts

- `roles` are the types of user trying to access `resources`
- `allows` describes the oprations user will need to do
- `matrix` describes the `allows` relation between `roles` and `resources`;
- third dimension of the matrix is an array of `0` and `1`s, the length of array should equal to `allows`'s. This array describes the permissions.

For example: in the above sample code, `matrix[0][2]` (`[1, 0, 0, 0]`) means the `guest` role is able to `'get'` the `'blog'` resource, but not others.

### Parameter limits
- Row number of `matrix` should eauql to `resources` length;
- Collum number of `matrix` should eauql to `role` length;
- Element number of `matrix` should eauql to `allows` length;

## Pros and Cons

### Pros
[node_acl](https://www.npmjs.com/package/acl) is good, but it acquires database to store the acls. And it is relatively hard to mantain and update acl using `node_acl`.

Benefits of using `acl-matrix`:
1. Three dimensional matrix is the simplest way to store acl;
1. Simple to config and simple for future change;
1. No dependency, acl matrix can be easily shared between frontend and backend;
1. Performance: no database needed, checking permissions is justing reading elemet in array

### Cons

1. By using [node_acl](https://www.npmjs.com/package/acl) you are able to save relations between `users` and `roles`. You will need to store the role of the user youself using `acl-matrix`
1. By default, permissions of each roles are fixed, which is suitable for most projects. But if you want to allow user define the acl, you will need to store multiple acl matrices


## TODOs
Add more method for the class maybe?