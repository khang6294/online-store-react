import React,{Component} from 'react'
import {Card,Image} from 'semantic-ui-react'
import Strapi from "strapi-sdk-javascript/build/main";
import {NavLink} from 'react-router-dom'
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
        console.log(this.state.brands)
        return (
            <>
            <Card.Group centered>
                {this.state.brands.map(brand => {
                    return (
                        <NavLink key={brand._id} to={`/${brand._id}/products`}>
                            <Card  raised onClick={() => console.log(brand._id)}>
                                <Image style={{height:200,backgroundColor:'white'}} src={`${apiUrl}${brand.brandImg.url}`} />
                                <Card.Content>
                                    <Card.Header>{brand.name}</Card.Header>
                                </Card.Content>
                            </Card>
                        </NavLink>
                    )
                })}
            </Card.Group>
            <NavLink to='/all/products'>SHOP ALL</NavLink>
            </>
        )
    }
}

export default BrandList

    