import { useState } from "react";
import { Recipe } from "../data/recipe";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./List.css";

const List: React.FC = () => {
  const [messages, setMessages] = useState<Recipe[]>([]);

  // useIonViewWillEnter(() => {
  //   const msgs = getMessages();
  //   setMessages(msgs);
  // });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {/* {messages.map(m => <MessageListItem key={m.id} message={m} />)} */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default List;
