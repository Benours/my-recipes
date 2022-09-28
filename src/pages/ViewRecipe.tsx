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
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowDown, arrowForward, personCircle } from "ionicons/icons";
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
    ing: false,
    rec: false,
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
    const { items, ing, rec } = this.state;
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
          <IonLabel className="title">
            <h1>{items.namePlate}</h1>
          </IonLabel>
          <IonLabel
            className="subtitle"
            onClick={() => this.setState({ ing: !ing })}
          >
            Ingredients :
            {ing ? (
              <IonIcon icon={arrowDown} />
            ) : (
              <IonIcon icon={arrowForward} />
            )}
          </IonLabel>
          {ing ? (
            items.ingredients.map((ingredient) => (
              <IonText> - {ingredient}</IonText>
            ))
          ) : (
            <></>
          )}
          <IonLabel
            className="subtitle"
            onClick={() => this.setState({ rec: !rec })}
          >
            Recette :
            {rec ? (
              <IonIcon icon={arrowDown} />
            ) : (
              <IonIcon icon={arrowForward} />
            )}
          </IonLabel>
          {rec ? <IonText>{items.recipe}</IonText> : <></>}
        </IonContent>
      </IonPage>
    );
  }
}

export default ViewRecipe;
