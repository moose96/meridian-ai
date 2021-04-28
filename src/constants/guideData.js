export const GUIDE_DATA = {
  '/browse': [
    {
      id: 'browse-add',
      text: `First of all, add sound(s) to the playlist. 
        You can browse and choose the ones you like in this section.`,
    },
    // {
    //   id: 'browse-add-all',
    //   text: 'For a new comers, here you can add all of the sounds if you want a quick start.'
    // },
    {
      id: 'browse-demo',
      text: 'Here is a button for you to play a prerecorded demo of them.',
    },
    {
      id: 'browse-categories',
      text: `Filter sounds by preferable categories if needed.`,
    },
    {
      id: 'navigation',
      text: `Here you can switch between sound browser and the player. 
        After choosing your sounds go the second section for an interactive play!`,
    },
  ],
  '/play': [
    {
      id: 'play-playlist',
      text: `In this section you can see your chosen sounds. 
      If you want, stop currently playing sound and click the next one for loading it. 
      You can also remove sounds by clicking the trash icon.`,
    },
    {
      id: 'play-transport-play',
      text: `Wait until loading is complete and click play here afterwards. 
      The sounds will intelligently generate with various properties (also called snapshots) 
      that will change periodically.`,
    },
    {
      id: 'play-transport-next',
      text:
        'If you want to change the properties immediately, click this button.',
    },
    {
      id: 'play-transport-prev',
      text: `If you prefer previous sound properties click this button to cancel the changes. 
      The player will choose similar snapshot to the one before the current. `,
    },
    {
      id: 'play-asmr-button',
      text: `If you really enjoy the current moment you can click this button. 
      The sound snapshot will freeze with its properties until you click it again.`,
    },
    {
      id: 'play-volume',
      text: `At last, this slider gives you the control over general sound volume. 
        Thank you for your attention and enjoy your sensations!`,
    },
  ],
};
