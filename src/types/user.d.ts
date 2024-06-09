export interface UserProps {
  email: string;
  name: string;
  picture: string;
}

export interface googleUserTableProps {
  id: string;
  userId: string;
  orgUnitId: string;
  cachedAt: string;
}

export interface googleListUsersResponseProps {
  kind: string;
  etag: string;
  users: {
    id: string;
  }[];
}
