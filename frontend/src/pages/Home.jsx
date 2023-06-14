import ListProject from "../components/listProject/ListProject";
import Navbar from "../components/nabvar/Navbar";

export default function Home() {
  return (
    <header className="App-header">
      <Navbar />
      <ListProject />
    </header>
  );
}
