import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonItem,
  IonText,
} from "@ionic/react";

interface ContainerProps {
  title: string;
}

const ListItem: React.FC<ContainerProps> = (props) => {
  return (
    <IonItem class="item" color="dark" key={props.title}>
      <IonCard class="card">
        <IonCardHeader class="card-header">
          <IonText color="light">Selection : {props.title}</IonText>
        </IonCardHeader>
        <IonCardContent class="card-content" color="dark">
          <IonText color="light">Plat A</IonText>
          <IonText color="light">Plat B</IonText>
          <IonText color="light">Plat C</IonText>
          <IonText color="light">Plat D</IonText>
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default ListItem;
