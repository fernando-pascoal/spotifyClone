import { createAppContainer, createStackNavigator } from "react-navigation";

import Main from "~/src/pages/Main";
import Podcast from "~/src/pages/Podcast";

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            Podcast
        },
        {
            defaultNavigationOptions: {
                header: null
            }
        }
    )
);

export default Routes;
