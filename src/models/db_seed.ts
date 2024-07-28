import Logger from '../libs/logger.js';
import Staff from './StaffModel/StaffModel.js';

const staffSeedData = [
  {
    _id: '66056a0b8cddbeac52b7221f',
    email: process.env.DEFAULT_APP_EMAIL,
    password: process.env.DEFAULT_APP_PASSWORD,
    phoneNumber: '07067775027',
    nickName: 'kadi',
    fullName: 'kadismile Ibrahim',
    role: 'admin',
    createdBy: '66056a0b8cddbeac52b7221f'
  },
  {
    _id: '65f343be0b30444e0835c499',
    email: 'blonde@gmail.com',
    password: process.env.DEFAULT_APP_PASSWORD,
    phoneNumber: '07066665027',
    nickName: 'blond',
    fullName: 'blonde Chilaka',
    role: 'installer',
    createdBy: '66056a0b8cddbeac52b7221f'
  },

  {
    _id: '65f89585fd782e2be490ef3e',
    email: 'cleopatra@gmal.com',
    password: process.env.DEFAULT_APP_PASSWORD,
    phoneNumber: '07064555027',
    nickName: 'Cleopatra',
    fullName: 'Cleopatra Odemwingie',
    role: 'installer',
    createdBy: '66056a0b8cddbeac52b7221f'
  }
];

export const seedDBdata = async () => {
  try {
    const staffCount = await Staff.countDocuments();
    if (staffCount < 1) {
      await Staff.create(staffSeedData);
      Logger.info('Staff Data Seeded Succesfully ....');
    }
  } catch (error) {
    Logger.error(error);
  }
};
