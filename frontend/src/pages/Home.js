import '../styles/Home.css';
import { Navbar } from '../components/navbar';
import { getRecipeApi } from '../api/recipeApi';
// {getRecipeApi()}

function Home() {
  return (
    <div className="Home">
      <div className='container'>
        <Navbar/>
        <h1>Lets Cook</h1>

      </div>
    </div>
  );
}

export default Home;
