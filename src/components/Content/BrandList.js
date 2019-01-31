import React,{Component} from 'react'
import {Card,Image} from 'semantic-ui-react'
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class BrandList extends Component {
    state = {
        brands: [],
        loadingBrands: true
    };

    async componentDidMount() {
        try {
            const response = await strapi.request("POST", "/graphql", {
                data: {
                query: `
                query {
                    brands {
                        _id
                        name
                        brandImg {
                            url
                        }
                    }
                }`
                }
            });
            this.setState({ brands: response.data.brands, loadingBrands: false });
            } catch (err) {
                console.error(err);
                this.setState({ loadingBrands: false });
            }
      }
    render(){
        return (
            <Card.Group centered>
                {this.state.brands.map(brand => {
                    return (
                    <Card key={brand._id} raised onClick={() => console.log(brand._id)}>
                        <Image style={{height:200,backgroundColor:'white'}} src={`${apiUrl}${brand.brandImg.url}`} />
                        <Card.Content>
                            <Card.Header>{brand.name}</Card.Header>
                        </Card.Content>
                    </Card>
                    )
                })}
            </Card.Group>
        )
    }
}

export default BrandList

    