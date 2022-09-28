import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
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
    console.log(this.state.ingredients);
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

    console.log(newRecipe);
  };

  takePicture = async() => {
    const {img} = this.state;

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality:100
    })
  }

  render() {
    const { ingredients } = this.state;
    return (
      <IonPage>
        <IonContent>
          <div className="daPhoto">
            
          </div>
          <IonButton onClick={ this.takePicture }>
            <IonIcon icon={cameraOutline}/>
          </IonButton>
          <div className="whatPlateBruh">
            <IonLabel>Nom du plat</IonLabel>
            <IonInput
              onIonChange={(event) =>
                this.setState({ namePlate: event.detail.value! })
              }
            />
          </div>
          <div className="daOrigin">
            <IonLabel>Ville</IonLabel>
            <IonInput
              onIonChange={(event) =>
                this.setState({ city: event.detail.value! })
              }
            />
            <IonLabel>Pays</IonLabel>
            <IonInput
              onIonChange={(event) =>
                this.setState({ country: event.detail.value! })
              }
            />
          </div>
          <div className="disCompo">
            {ingredients.map((_e, index) => (
              <div key={index}>
                <IonLabel>Ingrédients</IonLabel>
                <IonInput
                  onIonChange={(event) => {
                    let ingredients = [...this.state.ingredients];
                    ingredients[index] = event.detail.value!;
                    this.setState({ ingredients });
                  }}
                  value={_e}
                />
                {ingredients.length - 1 === index && (
                  <IonButton onClick={this.addIngredient}>
                    Ajouter un ingrédient
                  </IonButton>
                )}
                <div>
                  {ingredients.length > 1 && (
                    <IonButton onClick={() => this.delIngredient(index)}>
                      Supprimer ingrédient
                    </IonButton>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="someText">
            <IonLabel>Etapes de la recette</IonLabel>
            <IonTextarea
              autoGrow
              onIonChange={(event) =>
                this.setState({ recipe: event.detail.value! })
              }
            ></IonTextarea>
          </div>
          <IonButton onClick={() => this.validateForm()}>Valider</IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

export default AddRecipe;
