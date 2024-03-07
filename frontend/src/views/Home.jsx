import LangController from "../LangController";
import Authorization from "../components/guest/Authorization";
import ContactsComponent from "../components/guest/ContactsComponent";
import CustomersComponent from "../components/guest/CustomersComponent";
import Hero from "../components/Hero";
import ServiceComponent from "../components/guest/ServiceComponent";
import VisionMision from "../components/guest/VisionMission";
import WayWeDo from "../components/guest/WayWeDo";

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
