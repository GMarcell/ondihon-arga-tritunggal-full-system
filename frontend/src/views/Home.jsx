import LangController from "../LangController";
import Authorization from "../components/Authorization";
import ContactsComponent from "../components/ContactsComponent";
import CustomersComponent from "../components/CustomersComponent";
import Hero from "../components/Hero";
import ServiceComponent from "../components/ServiceComponent";
import VisionMision from "../components/VisionMission";
import WayWeDo from "../components/WayWeDo";

function Home() {
  return (
    <>
      <Hero />
      <Authorization />
      <VisionMision />
      <WayWeDo />
      <ServiceComponent />
      <CustomersComponent />
      <ContactsComponent />
    </>
  );
}

export default Home;
