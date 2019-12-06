import React, { Component } from "react";
import "~/src/config/statusbar";
import {
    Container,
    PageTitle,
    PodcastList,
    Podcast,
    Cover,
    Info,
    Title,
    Count
} from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PodcastsActions from "~/src/store/ducks/podcasts";

class Main extends Component {
    componentDidMount() {
        const { loadRequest } = this.props;
        loadRequest();
    }
    handlerPodcastPress = podcast => {
        const { navigation } = this.props;
        navigation.navigate("Podcast", { podcast });
    };

    render() {
        const { podcasts } = this.props;
        return (
            <Container>
                <PodcastList
                    ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
                    data={podcasts.data}
                    keyExtractor={podcast => String(podcast.id)}
                    renderItem={({ item: podcast }) => (
                        <Podcast
                            onPress={() => {
                                this.handlerPodcastPress(podcast);
                            }}
                        >
                            <Cover source={{ uri: podcast.cover }} />
                            <Info>
                                <Title>{podcast.title}</Title>
                                <Count>{`${podcast.tracks.length} episódios`}</Count>
                            </Info>
                        </Podcast>
                    )}
                />
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    podcasts: state.podcasts
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(PodcastsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
