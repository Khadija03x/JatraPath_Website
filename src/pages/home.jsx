import Layout from "../components/layout.jsx";
import "./../styles/pages/Home.css";
const Home = () => {
  return (
    <>
      <div className="background">
      <div className="circle1"></div>
      <div className="circle2"></div>
        <Layout>
          <div className="content">
            <h1>Welcome to the Home Page</h1>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Home;
