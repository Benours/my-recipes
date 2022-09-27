import { useState } from "react";
import { Recipe } from "../data/recipe";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
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
          <ListItem title="Grece" />
          <ListItem title="Italy" />
          <ListItem title="Japon" />
          <ListItem title="États-unis" />
          <ListItem title="France" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
