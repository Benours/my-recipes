import React, { Component } from "react";
import { Recipe } from "../data/recipe";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams, useRouteMatch, withRouter } from "react-router";
import "./ViewRecipe.css";

class ViewRecipe extends React.Component {
  state = {
    recipe: [],
    isLoaded: false,
    items: {
      namePlate: "",
      city: "",
      country: "",
      ingredients: [""],
      recipe: "",
      img: [""],
    },
  };

  componentDidMount() {
    const id = window.location.href.split("/").reverse()[0];
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { items } = this.state;
    return (
      <IonPage id="view-message-page">
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="Liste" defaultHref="/home"></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonLabel>
            <h1>{items.namePlate}</h1>
          </IonLabel>
        </IonContent>
      </IonPage>
    );
  }
}

export default ViewRecipe;
