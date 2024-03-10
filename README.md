## **Full Site**

https://blog-fullstack-app-ui.vercel.app/

## **Technologies Explored**

- **Node.js with Prisma and PostgreSQL**: Chose Node.js as the backend runtime, leveraging Prisma as the ORM for PostgreSQL. This combination streamlined the process of building a REST API and simplified database interactions, providing a robust backend foundation.
- **TypeScript**: Adopted TypeScript for both the backend and frontend to enforce type safety and reduce runtime errors, leading to more reliable code.
- **Supertest for Backend Testing**: Integrated Supertest for backend unit testing, enhancing the reliability of the API by allowing comprehensive endpoint testing.
- **Framer Motion**: Incorporated Framer Motion to add subtle animations, enhancing user interface interactivity and visual feedback.
- **Redux Toolkit and RTK Query**: Used Redux Toolkit for state management, including authentication features, and RTK Query for efficient data fetching and state management of API responses, reducing boilerplate and streamlining the app's data handling.
- **React Infinite Scroll Component**: Implemented infinite scroll for content display, offering a seamless browsing experience compared to traditional pagination.

## **Key Features**

- **Robust REST API**: A custom-built backend with Node.js, Prisma, and PostgreSQL, offering a solid foundation for the app's data handling.
- **Type Safety with TypeScript**: Both the frontend and backend are written in TypeScript, ensuring code reliability and reducing bugs.
- **Interactive UI with Framer Motion**: Minor animations added to the UI elements for a more dynamic user experience.
- **Efficient State Management**: Utilizes Redux Toolkit for managing application state and RTK Query for data fetching and caching.
- **Infinite Scroll**: Enhances content discovery without the need for pagination, providing a smooth browsing experience.

## **What I Learned**

Building the Fullstack Blog App was a rewarding experience that allowed me to dive deeper into backend development while refining my frontend skills. Integrating Prisma with PostgreSQL on a Node.js backend demonstrated the power of modern ORM tools in simplifying database interactions and schema management.

Using TypeScript across the stack enforced a disciplined coding approach, significantly reducing the potential for runtime errors and making the codebase more maintainable.

Exploring Framer Motion for animations taught me the value of subtle visual feedback in enhancing user interaction. The use of Redux Toolkit and RTK Query emphasized the importance of efficient state management and data fetching strategies in modern web development.

Implementing infinite scroll as opposed to pagination highlighted the importance of seamless user experiences and the technical considerations required to efficiently load and display data.


## **Getting Started**

To set up a local development environment for the Fullstack Blog App, follow these steps:

1. **Clone the repository**:
    
    ```
    git clone https://github.com/LataniaReece/blog_fullstack_app.git
    
    ```
    
2. **Install NPM packages for both backend and frontend**:
   -  For the backend:
        
        ```
        cd api
        npm install
        
        ```
        
    - For the frontend:
        
        ```
        cd ui
        npm install
        
        ```
3. **Set up Environment Variables:**

      Before running the application, you need to configure the required environment variables. These include database credentials, API keys, and any other sensitive configurations your app needs to function.
      
      ### **Backend:**
      
      Create a **`.env`** file in the **`api`** directory. Populate it with the necessary variables as shown below, replacing placeholder values with your actual data:
      
      ```
      PORT=8000
      NODE_ENV=development
      
      DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST/DATABASE_NAME"
      ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
      REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
      CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
      CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
      CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
      FRONTEND_ORIGIN=YOUR_FRONTEND_ORIGIN
      
      ```
      
      Replace **`USERNAME`**, **`PASSWORD`**, **`HOST`**, **`DATABASE_NAME`**, **`YOUR_ACCESS_TOKEN_SECRET`**, **`YOUR_REFRESH_TOKEN_SECRET`**, **`YOUR_CLOUDINARY_CLOUD_NAME`**, **`YOUR_CLOUDINARY_API_KEY`**, **`YOUR_CLOUDINARY_API_SECRET`**, and **`YOUR_FRONTEND_ORIGIN`** with the actual values relevant to your project.
      
      ### **Frontend:**
      
      Create a **`.env`** file in the **`ui`** directory and add the necessary configuration for connecting to your backend:
      
      ```
      VITE_API_BASE_URL=YOUR_BACKEND_API_URL
      
      ```
      
      Replace **`YOUR_BACKEND_API_URL`** with the URL where your backend API is hosted (e.g., **`http://localhost:8000`** if you're running the backend locally).
  4. **Run the backend and frontend**:

     - To start the backend server:
       
        
        ```
        npm run start:dev
        
        ```

     - To start the frontend:
       ```
       cd ui
       npm run dev
       ```

