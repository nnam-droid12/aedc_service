import { StaffDoc } from './../staff/staff';
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      staff: StaffDoc;
    }
  }
}
