import Header from './header/header'
export const Layout = (props) => {
    const {children, titleHead} = props
    return (
        <Header titleHead={titleHead}>
            {children}
        </Header>
    )
 
}