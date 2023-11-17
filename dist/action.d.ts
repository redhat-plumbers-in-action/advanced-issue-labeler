import { CustomOctokit } from './octokit';
declare function action(octokit: CustomOctokit): Promise<void>;
export default action;
