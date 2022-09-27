import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { KeysResult, Preferences } from "@capacitor/preferences";
import { close } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Recipe } from "../data/recipe";
import "./List.css";

class List extends React.Component {
  state = {
    text: "",
    listPlat: [
      {
        id: 0,
        namePlate: "Tomate",
        ingredients: ["tomate"],
        city: "TomatoCity",
        country: "TomatoCountry",
        recipe: "Tomatoes",
        img: ["Tomato"],
      },
    ],
  };
  // const [text, setText] = useState<string>("");
  // const [listPlat, setListPlat] = useState<Recipe[]>([
  //   {
  //     namePlate: "Tomate",
  //     ingredients: ["tomate"],
  //     city: "TomatoCity",
  //   },
  // ]);
  t = "key";

  componentDidMount = async () => {
    await this.setListePLat();
    // await this.checkName();
  };

  componentDidUpdate = async () => {
    // this.componentDidMount();
  };

  setListePLat = async () => {
    const list = fetch(`http://localhost:3000/recipes`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            listPlat: result,
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
  };

  save = async (liste: Recipe[]) => {
    this.setState({ listPlat: liste });
  };

  compareName = (platA: Recipe, platB: Recipe) => {
    if (platA.namePlate.toLowerCase() < platB.namePlate.toLowerCase())
      return -1;
    if (platA.namePlate.toLowerCase() > platB.namePlate.toLowerCase()) return 1;
    return 0;
  };

  compareCity = (platA: Recipe, platB: Recipe) => {
    if (platA.city.toLowerCase() < platB.city.toLowerCase()) return -1;
    if (platA.city.toLowerCase() > platB.city.toLowerCase()) return 1;
    return 0;
  };

  //  didMount = async () => {
  //   await checkName();
  //   binit = true;
  //   await setListePLat();
  // };

  // if (!binit) {
  //   didMount();
  // }

  render() {
    const { listPlat, text } = this.state;

    return (
      <IonPage>
        <IonContent>
          <IonButtons>
            <IonLabel>Trier par :</IonLabel>
            <IonButton
              onClick={() => {
                const newList = [...listPlat!].sort(this.compareName);
                this.setState({ listPlat: newList });
              }}
            >
              Nom
            </IonButton>
            <IonButton
              onClick={() => {
                const newList = [...listPlat!].sort(this.compareCity);
                this.setState({ listPlat: newList });
              }}
            >
              Origin
            </IonButton>
          </IonButtons>
          <IonList>
            <IonItem key={this.t}>
              <IonLabel position="floating">Rechercher</IonLabel>
              <IonInput
                value={text}
                onIonChange={(e) => this.setState({ text: e.detail.value! })}
              ></IonInput>
            </IonItem>
            {listPlat!.length > 0 ? (
              listPlat!.map((plat, index) => {
                if (
                  plat.namePlate.includes(text!) ||
                  plat.city.includes(text!)
                ) {
                  return (
                    <IonItem key={index} detail={false}>
                      <IonButton routerLink={`/recipe/${plat.id}`}>
                        <IonLabel>
                          <strong>{plat.namePlate}</strong> from{" "}
                          <strong>{plat.city}</strong>
                        </IonLabel>
                      </IonButton>
                      <IonButton
                        onClick={() => {
                          const newList = [
                            ...listPlat!.slice(0, index),
                            ...listPlat!.slice(index + 1),
                          ];
                          fetch(`http://localhost:3000/recipes/${plat.id}`, {
                            method: "DELETE",
                          }).then(() => console.log("Delete successful"));
                          this.save(newList);
                        }}
                      >
                        <IonIcon icon={close} />
                      </IonButton>
                    </IonItem>
                  );
                }
              })
            ) : (
              <></>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default List;
