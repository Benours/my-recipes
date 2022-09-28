import {
  IonContent,
  IonImg,
  IonList,
  IonPage,
  IonThumbnail,
} from "@ionic/react";
import "./Home.css";
import ListItem from "../components/ListItem";

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonThumbnail class="container">
          <IonImg
            class="logo"
            src="https://i.postimg.cc/hGKfyHJv/My-Recipes.png"
          />
        </IonThumbnail>
        <IonList class="list">
          <ListItem title="Italie" />
          <ListItem title="Japon" />
          <ListItem title="Allemagne" />
          <ListItem title="France" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
