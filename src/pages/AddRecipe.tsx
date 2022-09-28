import {
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea,
  IonContent,
  IonPage,
  IonHeader,
  IonItem,
  IonIcon,
} from "@ionic/react";
import {
  add,
  addCircleOutline,
  addOutline,
  addSharp,
  removeCircleOutline,
  removeOutline,
  removeSharp,
} from "ionicons/icons";
import React from "react";
import "./AddRecipe.css";

class AddRecipe extends React.Component {
  state = {
    namePlate: "",
    city: "",
    country: "",
    ingredients: [""],
    recipe: "",
    img: [""],
    newIngredient: [""],
  };

  addIngredient = () => {
    this.state.ingredients.push("");
    this.setState({ ingredients: [...this.state.ingredients] });
  };

  delIngredient = (index: number) => {
    const { ingredients } = this.state;
    ingredients.splice(index, 1);
    const listIngredient = [...ingredients];

    //listIngredient.splice(index, 1);
    this.setState({ ingredients: listIngredient });
  };

  validateForm = () => {
    const { namePlate, city, country, ingredients, recipe, img } = this.state;

    const newRecipe = {
      namePlate,
      city,
      country,
      ingredients,
      recipe,
      img,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    };
    fetch("http://localhost:3000/recipes", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  render() {
    const { ingredients } = this.state;
    return (
      <IonPage>
        <IonContent>
          <IonLabel className="recipe-title">Nouvelle recette</IonLabel>
          <IonItem className="recipe-item">
            <IonLabel position="floating">Nom du plat</IonLabel>
            <IonInput
              className="recipe-input"
              onIonChange={(event) =>
                this.setState({ namePlate: event.detail.value! })
              }
            />
          </IonItem>
          <IonItem className="recipe-item">
            <IonLabel position="floating">Ville</IonLabel>
            <IonInput
              className="recipe-input"
              onIonChange={(event) =>
                this.setState({ city: event.detail.value! })
              }
            />
          </IonItem>
          <IonItem className="recipe-item">
            <IonLabel position="floating">Pays</IonLabel>
            <IonInput
              className="recipe-input"
              onIonChange={(event) =>
                this.setState({ country: event.detail.value! })
              }
            />
          </IonItem>

          {ingredients.map((_e, index) => (
            <IonItem className="recipe-item" key={index}>
              <IonLabel position="floating">Ingrédient {index + 1}</IonLabel>
              <IonInput
                className="recipe-input"
                onIonChange={(event) => {
                  let ingredients = [...this.state.ingredients];
                  ingredients[index] = event.detail.value!;
                  this.setState({ ingredients });
                }}
                value={_e}
              />
              <IonItem className="recipe-btn">
                {ingredients.length - 1 === index && (
                  <IonButton onClick={this.addIngredient}>
                    <IonIcon icon={addSharp} />
                  </IonButton>
                )}
                {ingredients.length > 1 && (
                  <IonButton onClick={() => this.delIngredient(index)}>
                    <IonIcon icon={removeSharp} />
                  </IonButton>
                )}
              </IonItem>
            </IonItem>
          ))}
          <IonLabel className="recipe-label-area">
            Etapes de la recette
          </IonLabel>
          <IonTextarea
            className="recipe-text-area"
            autoGrow
            onIonChange={(event) =>
              this.setState({ recipe: event.detail.value! })
            }
          ></IonTextarea>
          <IonButton href="/list" onClick={() => this.validateForm()}>
            Valider
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

export default AddRecipe;
