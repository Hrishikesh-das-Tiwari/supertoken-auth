import { TypeFramework } from "supertokens-node/lib/build/framework/types";

export interface AuthConfig {
  framework: TypeFramework;
  supertokens: {
    connectionURI: string;
  };
  appInfo: {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
  };
  recipeList: any;
  isInServerlessEnv: boolean;
}
