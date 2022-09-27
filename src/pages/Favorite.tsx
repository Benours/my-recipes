import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonTitle } from "@ionic/react";
import React from "react";

class Favorite extends React.Component{

    state = {
        favorites:[]
    };

    getFavorite(){
        this.setState({}, ()=>{
            fetch("http://localhost:3000/recipes").then(response=>response.json()).then(result => {this.setState({favorites: result})});
        })
    }

    cancelFavorite(id: any){
        fetch("http://localhost:3000/recipes/"+ id,{method: 'DELETE'})
        .then(res => res.json());
        //todo update render
    }

    componentDidMount() {
        this.getFavorite();
    }

    render(){
        const {favorites} = this.state;
        return(
            <IonContent>
                        <IonItem>
                            <IonTitle>FAVORITE</IonTitle>
                        </IonItem>
            
            {favorites.map(favorite=>{
                const {
                    id,
                    namePlate,
                    city,
                    country
                } = favorite;
                return(
                        <IonCard key={ id }>
                            <IonCardHeader>
                                <IonCardTitle>{ namePlate }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div>{ city }</div>
                                <div>{ country }</div>
                            </IonCardContent>
                            <IonButton onClick={()=>this.cancelFavorite(id)}>Retirer des favoris</IonButton>
                        </IonCard>   
                );
            })
        }
        </IonContent>
            
        );
    }

}

export default Favorite;