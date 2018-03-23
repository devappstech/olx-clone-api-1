const usersModel = require('../api/models/usersModel');

/*
Constant Variables for Testcases
*/
const oldUser = {
  username: 'akash',
  email: 'akash@improwised.com',
  phone: 1234567890
};
const newUser = {
  username: 'uniqueOne',
  email: 'UniqueOne@improwised.com',
  phone: 1234567890
};
const oldUserAuth = {
  id: 1,
  password: '123456789'
};
const newUserAuth = {
  id: 4,
  password: 'secertAdmin'
};
const modifyUser = {
  username: 'akash updated',
  email: 'akash@improwised.com',
  phone: 1234567890
}
const oldEmail = 'akash@improwised.com';
const newEmail = 'somethingNew@gmail.com';
const advertiseId = 1;
const nonRegisteredEmail = 'notRegisteredUser@user.com';
const registeredEmail = 'akash@improwised.com';
const profileId = 1;
const invaldProfileID = 4561320;
const newPassword = '123456789'
const newToken = '9f063345-b04c-de46-4f04-2be4e4ea212f';
const passwordResetToken = 'e5984a7d-b305-418c-a14b-d8466cbf1290';

/*
---------------------------------------------------------
  Users Models: createLocalUser - insert new local users
---------------------------------------------------------
*/
describe('Insert new User', () => {

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
    return usersModel.findUserProfile(invaldProfileID)
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findUserProfile(profileId)
      .then(data => {
        expect(data[0].user_id).toBe(profileId);
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
    return usersModel.findLocalUser(nonRegisteredEmail)
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findLocalUser(registeredEmail)
      .then(data => {
        expect(data[0].user_email).toBe(registeredEmail);
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
    return usersModel.findUserAdvertises(10, 10, advertiseId)
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
    return usersModel.findById(invaldProfileID)
      .then(data => {
        expect(data[0]).toBeUndefined();
      })
  });

  it('should return data array with length 1', () => {
    return usersModel.findById(profileId)
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
    return usersModel.editUser(profileId, modifyUser.username, modifyUser.email, modifyUser.phone)
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
    return usersModel.resetPassword(profileId, newPassword)
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
    return usersModel.isEmailAvailable(oldEmail)
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

  it('should return empty array for new email', () => {
    return usersModel.isEmailAvailable(newEmail)
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

/*
---------------------------------------------------------
  Users Models: findIdByEmail - find user id by email
---------------------------------------------------------
*/
describe('find user id by email', () => {
  it('should return data array', () => {
    return usersModel.findIdByEmail(oldEmail)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Users Models: resetEmailEntry - insert new reset password
  entry to database
---------------------------------------------------------
*/
describe('insert reset password entry to database', () => {
  it('should return data array', () => {
    return usersModel.resetEmailEntry(oldEmail, newToken)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Users Models: findByToken - find user by token
---------------------------------------------------------
*/
describe('find user by token', () => {
  it('should return data array', () => {
    return usersModel.findByToken(passwordResetToken)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});
