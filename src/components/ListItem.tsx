import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";

interface ContainerProps {
  title: string;
}

const ListItem: React.FC<ContainerProps> = (props) => {
  const [tab, setTab] = useState([
    {
      id: 0,
      namePlate: "",
      ingredients: [""],
      city: "",
      country: "",
      recipe: "",
      img: [""],
    },
  ]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => setTab(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <IonItem class="item" color="dark" key={props.title}>
      <IonCard class="card">
        <IonCardHeader class="card-header">
          <IonText color="light">Selection : {props.title}</IonText>
        </IonCardHeader>
        <IonCardContent class="card-content" color="dark">
          {/* eslint-disable-next-line array-callback-return */}
          {tab.map((recipe) => {
            if (recipe.country === props.title)
              return (
                <IonButton routerLink={`/recipe/${recipe.id}`}>
                  {recipe.namePlate}
                </IonButton>
              );
          })}
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default ListItem;
