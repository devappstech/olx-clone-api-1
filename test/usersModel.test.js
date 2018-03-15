const usersModel = require('../api/models/usersModel');

/*
---------------------------------------------------------
  Users Models: createLocalUser - insert new local users
---------------------------------------------------------
*/
describe('Insert new User', () => {

  const oldUser = {
    username: 'test',
    email: 'r@r.com',
    phone: 1234567890
  };

  const newUser = {
    username: 'test1',
    email: 'testmeagain11@test.com',
    phone: 1234567890
  };

  it('should return undefined', () => {
    return usersModel.createLocalUser(oldUser.username, oldUser.email, oldUser.phone)
      .then(data => {
        expect(data).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.createLocalUser(newUser.username, newUser.email, newUser.phone)
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

});

/*
---------------------------------------------------------
  Users Models: createLocalUserAuth - insert new local
  users auth
---------------------------------------------------------
*/
describe('Insert new local user auth', () => {

  const oldUserAuth = {
    id: 1,
    password: '123456789'
  };

  const newUserAuth = {
    id: 110,
    password: 'secertAdmin'
  };

  it('should return undefined', () => {
    return usersModel.createLocalUserAuth(oldUserAuth.id, oldUserAuth.password)
      .then(data => {
        expect(data).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.createLocalUserAuth(newUserAuth.id, newUserAuth.password)
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

});

/*
---------------------------------------------------------
  Users Models: findUserProfile - find user and return
  data
---------------------------------------------------------
*/
describe('Find user and send user data', () => {

  it('should return undefined', () => {
    // 1000000 is invalid id
    return usersModel.findUserProfile(1000000)
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findUserProfile(1)
      .then(data => {
        expect(data[0].user_id).toBe(1);
      })
  });

});

/*
---------------------------------------------------------
  Users Models: findLocalUser - find local user and
  their return data
---------------------------------------------------------
*/
describe('Find Local user and Return user and auth data', () => {

  it('should return undefined', () => {
    return usersModel.findLocalUser('notRegisteredUser@user.com')
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findLocalUser('akash@improwised.com')
      .then(data => {
        expect(data[0].user_email).toBe('akash@improwised.com');
      })
  });

});

/*
---------------------------------------------------------
  Users Models: userAdvertise - find advertise submitted by
  user.
---------------------------------------------------------
*/
describe('Find Advertises submitted by user id', () => {
  it('should return data array', () => {
    return usersModel.findUserAdvertises(10, 10, 1)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Users Models: findById - find user and then return data
---------------------------------------------------------
*/
describe('Find user by id and auth type', () => {

  it('should return undefined', () => {
    return usersModel.findById(456456, 'Local')
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findById(1, 'Local')
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

});

/*
---------------------------------------------------------
  Users Models: editUser - edit existing user details
  by user id.
---------------------------------------------------------
*/
describe('edit existing user details by user id', () => {
  it('should return empty data array on success update', () => {
    return usersModel.editUser(1, 'testEdit', 'testabc@test.com', 9898076543)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Users Models: resetPassword - edit existing user local
  auth password.
---------------------------------------------------------
*/
describe('edit existing user local auth password.', () => {
  it('should return empty data array on update', () => {
    return usersModel.resetPassword(1, 'model@Password')
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Users Models: isEmailAvailable - check if new users
  email is already in database ot not.
---------------------------------------------------------
*/
describe('check if new users email is already in database ot not.', () => {

  it('should return non empty array for existing email', () => {
    return usersModel.isEmailAvailable('ac.mattis@ultriciesadipiscing.net')
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

  it('should return empty array for new email', () => {
    return usersModel.isEmailAvailable('model@newEmail.com')
      .then(data => {
        expect(data).toHaveLength(0);
      })
  });

});

/*
---------------------------------------------------------
  Users Models: countUserAdvertise - Check total logged in
  users advertises.
---------------------------------------------------------
*/
describe('Check total logged in users advertises.', () => {
  it('should return count data array', () => {
    return usersModel.countUserAdvertise()
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});
