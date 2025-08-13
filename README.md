
# Mythbuster 🚀

Mythbuster is a full-stack application that allows users to share, discover, and vote on interesting facts. Each fact is categorized and linked to its source, promoting verifiable information in a fun, interactive way.

**[Live Demo](https://debrup-saha-mythbuster.netlify.app/)**

-----

## ✨ Features

  * **Filter Facts:** View and filter facts by predefined categories.
  * **Share Knowledge:** Add new facts to the database, including a mandatory source link for verification.
  * **Community Voting:** Upvote, downvote, or mark facts as "disputed" to reflect community consensus.
  * **Responsive Design:** A clean and modern UI that works seamlessly across all devices.

-----

## 🛠️ Tech Stack

  * **Frontend:** [React](https://react.dev/) (with [Vite](https://vitejs.dev/) for a blazing-fast development experience)
  * **Backend & Database:** [Supabase](https://supabase.com/) (an open-source Firebase alternative)
  * **Styling:** Vanilla CSS

-----

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine (which includes npm).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/username/project.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd your-project
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    This project requires a connection to a Supabase backend. Create a `.env` file in the root of your project and add your Supabase project URL and anon key.

    You can find these in your Supabase project dashboard under **Project Settings \> API**.

    ```env
    # .env file
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

-----

## 🏃‍♂️ Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

This command runs the app in development mode. Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (or the port shown in your terminal) to view it in your browser. The page will automatically reload if you make any changes.

### `npm run build`

This command builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
