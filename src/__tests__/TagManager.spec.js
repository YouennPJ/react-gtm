/**
 * @jest-environment jsdom
 */
import TagManager from '../TagManager'

describe('TagManager', () => {
  const INIT_SCRIPT_ID = "gtm-init"
  const DATALAYER_SCRIPT_ID = "gtm-dataLayer"
  const GTMID = "GTM-000000"

  doc = jest.spyOn(document.head, 'insertBefore')

  beforeEach(()=> {
    window.dataLayer = [];
    const gtmScript = document.getElementById(INIT_SCRIPT_ID)
    if (gtmScript)gtmScript.remove()
  })

  it('should render tagmanager', () => {
    expect(document.getElementById(INIT_SCRIPT_ID)).toBe(null)
    expect(window.dataLayer).toHaveLength(0)
    TagManager.initialize({gtmId: GTMID})
    expect(document.getElementById(INIT_SCRIPT_ID)).not.toBe(null)
    expect(window.dataLayer).toHaveLength(1)
  })

  it('should render datalayer', () => {
    expect(document.getElementById(INIT_SCRIPT_ID)).toBe(null)
    expect(window.dataLayer).toHaveLength(0)
    const gtmArgs = {
      gtmId: GTMID,
      dataLayer: {
        userInfo: 'userInfo'
      }
    }
    TagManager.initialize(gtmArgs)
    expect(document.getElementById(DATALAYER_SCRIPT_ID)).not.toBe(null)
    expect(document.getElementById(INIT_SCRIPT_ID)).not.toBe(null)
    expect(window.dataLayer).toHaveLength(2)
  })

  it('should render datalayer separately', () => {
    expect(document.getElementById(INIT_SCRIPT_ID)).toBe(null)
    expect(window.dataLayer).toHaveLength(0)
    const gtmArgs = {
      gtmId: GTMID,
    }
    expect(doc).toHaveBeenCalled()
    TagManager.initialize(gtmArgs)
    expect(document.getElementById(INIT_SCRIPT_ID)).not.toBe(null)
    const dataLayerArgs = {
        dataLayer: {
            userInfo: 'userInfo',
            pageTitle: 'home',
            pagePath: '/home',
        },
    }
    TagManager.dataLayer(dataLayerArgs)
    expect(window.dataLayer).toHaveLength(2) 
  })
})
