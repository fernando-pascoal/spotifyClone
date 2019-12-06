import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
    Container,
    EpisodeList,
    PodcastDetails,
    Background,
    Cover,
    BackButton,
    PodcastTitle,
    PlayButton,
    PlayButtonText,
    Episode,
    Title,
    Author
} from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayerActions from "~/src/store/ducks/player";

class Podcast extends Component {
    handlerBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    handlerPlay = episodeId => {
        const { setPodcastRequest, navigation } = this.props;
        const podcast = navigation.getParam("podcast");
        setPodcastRequest(podcast, episodeId);
    };

    render() {
        const { navigation, currentEpisode } = this.props;
        const podcast = navigation.getParam("podcast");
        return (
            <Container>
                <EpisodeList
                    ListHeaderComponent={() => (
                        <PodcastDetails>
                            <Background
                                source={{ uri: podcast.cover }}
                                blurRadius={5}
                            />
                            <BackButton onPress={this.handlerBack}>
                                <Icon
                                    name="arrow-back"
                                    size={25}
                                    color="#fff"
                                />
                            </BackButton>
                            <Cover source={{ uri: podcast.cover }} />
                            <PodcastTitle>{podcast.title}</PodcastTitle>
                            <PlayButton onPress={this.handlerPlay}>
                                <PlayButtonText>Reproduzir</PlayButtonText>
                            </PlayButton>
                        </PodcastDetails>
                    )}
                    data={podcast.tracks}
                    keyExtractor={episode => String(episode.id)}
                    renderItem={({ item: episode }) => (
                        <Episode onPress={() => this.handlerPlay(episode.id)}>
                            <Title
                                active={
                                    currentEpisode &&
                                    currentEpisode.id === episode.id
                                }
                            >
                                {episode.title}
                            </Title>
                            <Author>{episode.artist}</Author>
                        </Episode>
                    )}
                ></EpisodeList>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    currentEpisode: state.player.podcast
        ? state.player.podcast.tracks.find(
              episode => episode.id === state.player.current
          )
        : null
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(PlayerActions, dispatch);

//export default Podcast;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Podcast);
