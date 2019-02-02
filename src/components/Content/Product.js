import React,{Component} from 'react';
import { Grid, Image,Header, Button,Icon } from 'semantic-ui-react'
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);


class Product extends Component{
    state = {
        product: null,
        loadingProduct: true,
        sizePicked: null
    };

    async componentDidMount() {
        console.log(this.props.match.params.brandId)
        try {
            const response = await strapi.request("POST", "/graphql", {
                data: {
                query: `
                query{
                    product(id:"${this.props.match.params.productId}"){
                      _id
                      name
                      description
                      price
                      productImg{
                        url
                      }
                      sizes
                    }
                  }`
                }
            });
            this.setState({ product: response.data.product, loadingProduct: false });
            } catch (err) {
                console.error(err);
                this.setState({ loadingProduct: false });
            }
    }

    displaySizes = (product) => {
        const productSizes = product.sizes.sizes.map(size => {
            return (
                <Grid.Column>
                    <div 
                        className={this.state.sizePicked && this.state.sizePicked.size === size.size ? "size___item-active": "size___item"}
                        onClick = {() => this.setState({sizePicked:size})}
                    >
                        <p>{size.size}</p>
                    </div>
                </Grid.Column>
            )
        })
        return productSizes
    }
    render(){
        const {product,loadingProduct,sizePicked} = this.state
        console.log(sizePicked)
        console.log(product)
        if(product){
            return (
                <Grid stackable>
                    <Grid.Column width={8}>
                        <Image style={{width: 400,height:400}} src={`${apiUrl}${product.productImg.url}`}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Grid divided='vertically'>
                        <Grid.Row>
                            <Header size='huge'>
                                {product.name}
                                <Header.Subheader>
                                    {product.description}
                                </Header.Subheader>
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                        <h1>{product.price}$</h1>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid >
                                <Grid.Column>
                                    <Grid.Row>
                                        <h2>Sizes</h2>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Row columns={5}>
                                    {this.displaySizes(product)}
                                </Grid.Row>
                                <Grid.Row >
                                    <Button icon labelPosition='right'>
                                    Add to cart
                                    <Icon name='cart' />
                                    </Button>
                                </Grid.Row>
                            </Grid> 
                        </Grid.Row>
                    </Grid>
                    </Grid.Column>
                </Grid>
            )
        } else {
            return null
        }
        
    }
}

export default Product