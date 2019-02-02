import React from 'react'
import {Container,Dropdown,Image,Menu,Input} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
const Header = (props) => (
    <div>
        <Menu fixed='top' inverted>
        <Container>
            <NavLink to="/">
            <Menu.Item as='a' header>
                <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                Project Name
            </Menu.Item>
            </NavLink>
            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>
            <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </Container>
        </Menu>
    </div>
)

export default Header