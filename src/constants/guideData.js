export const GUIDE_DATA = {
  '/browse': [
    {
      id: 'browse-add',
      text: 'First, you should add sound which you like to playlist.',
    },
    {
      id: 'browse-demo',
      text:
        'If you want to know how the sounds might sound like you can play the prerecorded demo.',
    },
    {
      id: 'browse-categories',
      text: `If you don't want to show all sounds you can filter it by categories.`,
    },
    {
      id: 'navigation',
      text:
        'There is the main navigation of this app. If you choose the sounds you should go to Play! page.',
    },
  ],
  '/play': [
    {
      id: 'play-playlist',
      text: `This is the main playlist where your chosen sounds are. Before loading next sound you have 
        to stop currently playing sound and then click next sound in playlist. You can remove sounds by clicking thrash icon.`,
    },
    {
      id: 'play-transport-play',
      text: `Before clicking play wait until loading is complete. Then click this button and enjoy. 
        The properties of sound (also called "snapshot") will be changing periodically.`,
    },
    {
      id: 'play-transport-next',
      text: 'If you want to change properties immediately, click this button',
    },
    {
      id: 'play-transport-prev',
      text: `If you don't like current properties of sound clicking this button move you backward 
      to previous snapshot and the player will try to randomize other properties which are less 
      similar to previous.`,
    },
    {
      id: 'play-asmr-button',
      text: `If you really like current snapshot you can click this button. 
      The properties will be frozen and you could enjoy more current played sound.`,
    },
    {
      id: 'play-volume',
      text: 'This control changes master volume of played sounds.',
    },
  ],
};
