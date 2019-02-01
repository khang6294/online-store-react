import React,{Component} from 'react'
import {Card,Image} from 'semantic-ui-react'
import Strapi from "strapi-sdk-javascript/build/main";
import {NavLink} from 'react-router-dom'
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class ProductList extends Component {
    state = {
        products: [],
        loadingProducts: true
    };

    async componentDidMount() {
        console.log(this.props.match.params.brandId)
        try {
            const response = await strapi.request("POST", "/graphql", {
                data: {
                query: `
                query {
                    brand(id: "${this.props.match.params.brandId}"){
                        name
                        products {
                            _id
                            name
                            price
                            description
                            productImg {
                                url
                            }
                            sizes
                        }
                    }
                }`
                }
            });
            console.log(response.data)
            this.setState({ products: response.data.brand.products, loadingProducts: false });
            } catch (err) {
                console.error(err);
                this.setState({ loadingProducts: false });
            }
      }
    render(){
        console.log(this.state.products)
        return (
            <>
            <Card.Group centered>
                {this.state.products.map(product => {
                    return (
                        <NavLink to={`/${product._id}/products`}>
                            <Card key={product._id} raised onClick={() => console.log(product._id)}>
                                <Image style={{height:200,backgroundColor:'white'}} src={`${apiUrl}${product.productImg.url}`} />
                                <Card.Content>
                                    <Card.Header>{product.name}</Card.Header>
                                    <Card.Meta>
                                    ${product.price}
                                    </Card.Meta>
                                    <Card.Description>{product.description}</Card.Description>                                    
                                </Card.Content>
                            </Card>
                        </NavLink>
                    )
                })}
            </Card.Group>
            </>
        )
    }
}

export default ProductList

    