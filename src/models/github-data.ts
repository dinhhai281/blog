export interface Viewer {
  avatarUrl: string;
  email: string;
  login: string;
  name: string;
}

export interface GithubData {
  data: {
    viewer: Viewer;
  };
}
