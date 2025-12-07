# Contributing guide
We appreciate your interest in contributing to StudySquared. In this guide, we will cover how you can quickly get started with contributing so that you can make your first contribution to StudySquared.

## Submitting an issue
Before submitting an issue, ensure that no similar issue has already been submitted. You can do so by checking the [issues tab](https://github.com/TeddiKao/StudySquared/issues) on GitHub. An issue or discussion might already exist and there could be a possible workaround.

If you have ensured that no similar issue exists, you can [submit a new issue](https://github.com/TeddiKao/StudySquared/issues/new)

Make sure to follow the guidelines below 

### Naming conventions
When opening a new issue, please follow the naming conventions below
- For bugs: `Bug: [short description of the bug]`
- For features: `Feature: [short description of the feature]`
- For improvements: `Improvement: [short description of the improvement]`
- For documentation: `Documentation: [short description of the documentation]`

#### Examples
- `Improvement: OCR handling for messy handwritten notes`
- `Bug: New blocks are not being added to the editor`
- `Feature: Add a bullet list block to the editor`
- `Documentation: Clarify instructions for local development`

### Description of issue
The body of the issue should contain

#### For features and improvements
- A description of the feature/improvement
- A use case for the feature/improvement or how it would help the user (optional)
- A list of possible implementations (optional)

#### For bugs
- A description of the bug
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots (optional)
- Device and browser used (optional)

#### For documentation
- A description of the documentation
- A link to the documentation (optional)

## Project setup

### Requirements
- Node.js v22+ (recommended)
  The project has been tested on Node.js v22.14.0 and has not been tested on earlier versions
- [Git](https://git-scm.com/)
- npm 10+ (recommended)
  The project has been tested with npm v10.9.2 and has not been tested with earlier versions
- A [Clerk](https://clerk.com/) account
- A [Convex](https://convex.dev/) account

### Setting up the project
1. Fork the repository
2. Clone the forked repo and navigate into the project directory
```
git clone https://github.com/[your-github-username]/StudySquared.git [folder-name]
cd [folder-name]
cd app
```
3. Make the setup script executable **(optional for Windows)**
```
chmod +x setup.mjs
```
4. Run the setup script. This installs the dependencies for the project and copies the env.example file.
#### Windows
```
node setup.mjs
```

#### Linux/MacOS
```
./setup.mjs
```

5. Set up the environment variables as described in the following section
6. Open two terminals and run the following commands in each of them
#### Running the development server
```
npm run dev
```
#### Running the database
```
npx convex dev
```
7. Navigate to `http://localhost:3000` in your browser to view the app

That's all you need to do to get started with contributing to StudySquared. Happy coding!

### Environment variables
1. Go to your Clerk account and create a new Clerk project. Name it whatever you like
2. In the project dashboard, select `Next.js` follow the instructions and replace the values of the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` accordingly. Alternatively, you can get the API keys by going to "Configure" > "Instance" > "API Keys" and copy the keys from the "Quick Copy" section. Replace the values of the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in the `.env.local` file with the copied values
3. Follow Step 3 of [this guide](https://docs.convex.dev/auth/clerk#nextjs) to create a JWT template. Make sure you save the **Issuer URL** somewhere. 
4. Run `npx convex dev` in the terminal. You will be prompted to log in to your Convex account and create your project. It will also update the `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` values in the `.env.local` file
5. In the `.env.local` file, replace the `CLERK_JWT_ISSUER_DOMAIN` value with the **Issuer URL** you saved earlier
7. In the [Convex dashboard](https://dashboard.convex.dev/), navigate to the project which was created in Step 5.
8. In the left sidebar, click on the "Settings" tab and in the "Environment Variables" tab, add a new environment variable with the name `CLERK_JWT_ISSUER_DOMAIN` and the value as the **Issuer URL** you saved earlier
9. Finally, run `npx convex dev` to switch your deployment to the new configuration

After following these steps, you are ready to make your first contribution to StudySquared!