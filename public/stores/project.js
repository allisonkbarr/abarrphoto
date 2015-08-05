
import R from 'ramda'

var IMG_ROOT = 'http://res.cloudinary.com/dv3yibyz2/image/upload/'

var projects = [
  {
    slug: 'jfk-house',
    name: 'JFK House',
    description: [ `This dwelling, which is the last vacation home used by JFK and his family in the summer of 1963,
    is on Squaw Island in Hyannisport, MA. It was photographed for a National Historic Register Nomination, but the
    new owner, a Kennedy family member, declined to go forward with it.` ],
    photos: [
      { src: IMG_ROOT + 'jfk-house/img001.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img014_zmpab5.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img015_afrece.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img013_nvmbsq.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img012_u3yxjs.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img010_f7idxw.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img006_h5qfgm.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img009_gqsjy6.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img007_tlqyxe.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img016.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img017.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img018.jpg', caption: '' },
      { src: IMG_ROOT + 'jfk-house/img019.jpg', caption: '' },
    ]
  },
	{
		slug: 'duck-house',
		name: 'Duck House',
		description: [
			"From the Fenway Civic Association website: ",
			"\"On Agassiz Road, the parkway that links the East and West Fenway, sits a late 19th century building known as the Duck House.  This City-owned building, which has been boarded up and out of use since the 1980s, has the potential to serve as a community asset.\"",
			"This building was photo documented with large format photography to assist a documentation class of the BAC. "
		],
		photos: [
      { src: IMG_ROOT + 'HABS_horizontal-1_oajvgf.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_horizontal-3_cpliwe.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_horizontal-4_zohcsm.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-12_ntdm3h.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-8_dsm2aa.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-10_cq8ckw.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-9_cbvvhs.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-11_upsrtj.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-5_qayrcl.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-7_vsxpuk.jpg', caption: '' },
			{ src: IMG_ROOT + 'HABS_vertical-6_zynucp.jpg', caption: '' }
		]
	}
]

var gallery = [
	{ src: IMG_ROOT + '01-West_Elevation_q65msi.jpg', caption: '' },
  { src: IMG_ROOT + '02-South_elevation_b0wgxk.jpg', caption: '' },
  { src: IMG_ROOT + '03-Southeast_Elevation_aihkbq.jpg', caption: '' },
  { src: IMG_ROOT + '04-East_Elevation_dxhpsl.jpg', caption: '' },
  { src: IMG_ROOT + '06-North_elevation_gv9ygk.jpg', caption: '' },
  { src: IMG_ROOT + '07-Southwest_elevation_at_wall_corner_ozaso4.jpg', caption: '' },
  { src: IMG_ROOT + '15-cornice_and_brackets_azpvau.jpg', caption: '' },
	{ src: IMG_ROOT + '_IGP4889_v9ltv8.jpg', caption: '' },
	{ src: IMG_ROOT + '_IGP4888_kcsjgw.jpg', caption: '' },
	{ src: IMG_ROOT + '_IGP4899_jaiaya.jpg', caption: '' },
	{ src: IMG_ROOT + '_IGP4896_i60lgd.jpg', caption: '' },
	{ src: IMG_ROOT + '_IGP4893_thr1jf.jpg', caption: '' },
	{ src: IMG_ROOT + 'door_trim_xd9gyn.jpg', caption: '' },
	{ src: IMG_ROOT + 'crown_moulding_mo0yfr.jpg', caption: '' },
	{ src: IMG_ROOT + 'ceiling_fixture_irvfhu.jpg', caption: '' },
	{ src: IMG_ROOT + 'Ceiling_fixture-2_jacu7q.jpg', caption: '' },
	{ src: IMG_ROOT + 'mirror_frame_detail_prbksv.jpg', caption: '' },
	{ src: IMG_ROOT + 'mirror_frame_detail-3_zguffd.jpg', caption: '' },
	{ src: IMG_ROOT + 'mirror_frame_detail-2_pcrq6f.jpg', caption: '' },
	{ src: IMG_ROOT + 'trim_prp4ia.jpg', caption: '' },
	{ src: IMG_ROOT + 'Staircase_from_below-sm_c0pbsk.jpg', caption: '' },
]

export default function(state, hub) {

  state.set({
    $set: {
      showNav: false,
      list: projects,
			justGallery: gallery,
      selected: null,
      selectedThumbIndex: null
    }
  })

  hub.on({

    selectThumbByIndex: function(slug, i) {
      var project = R.find(R.propEq('slug', slug), projects)
      state.set({
        selected: { $set: project },
        selectedThumbIndex: { $set: i }
      })
    },

    toggleProjectNav: function() {
      state.set({ showNav: { $set: !state.get().showNav } })
    },

    showProjectNav: function() {
      state.set({ showNav: { $set: true } })
    },

    hideProjectNav: function() {
      state.set({ showNav: { $set: false } })
    },

    selectProjectBySlug: function(slug) {
      var project = R.find(R.propEq('slug', slug), projects)
      state.set({
        selected: { $set: project },
        selectedThumbIndex: { $set: null }
      })
    }
  })
}
