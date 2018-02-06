require('should');
const AclMatrix = require('./index');

const roles = ['admin', 'member', 'guest'];
const resources = ['blog', 'comment'];
const allows = ['get', 'add', 'update', 'delete'];

const matrix = [
    //   admin        member         guest
    [[1, 1, 1, 1], [1, 0, 1, 1], [1, 0, 0, 0]], // blog
    [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], // comment
];

const acl = new AclMatrix(roles, resources, allows, matrix);

test('should not allow', () => {
    const isAllowed = acl.isAllowed('member', 'blog', 'add');
    isAllowed.should.equal(0);
});

test('should allow', () => {
    const isAllowed = acl.isAllowed('member', 'blog', 'get');
    isAllowed.should.equal(1);
});