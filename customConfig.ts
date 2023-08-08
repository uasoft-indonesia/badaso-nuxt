export interface BadasoConfig {
  endpoint: string | undefined;
  key?: string;
  entities: {
    post: boolean;
    content: boolean;
  };
  prefix: string | undefined;
}
