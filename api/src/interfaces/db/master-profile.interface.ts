interface IMasterProfile {
  id: string;
  biography: string | null;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IMasterProfile;
