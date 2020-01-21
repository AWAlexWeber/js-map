<link rel = "stylesheet" type="text/css" href="css/menu.css" />
<link rel = "stylesheet" type="text/css" href="css/click.css" />

<div class = "popup_background">
    <div class = "popup_container">
        <div class = "popup_close_x">
            <div class = "popup_x">
                X
            </div>

            <div class = "popup_title">
                Creating New Entry
            </div>

            <div class = "popup_location_holder">
                <div class = "popup_location_header">
                    Popup Location:
                </div>

                <div class = "popup_location_x">Loading...</div>
                <div class = "popup_location_y">Loading...</div>
            </div>

            <div class = "popup_info_holder">
                <div class = "popup_info_atlas">
                    Atlas ID:
                </div>
            </div>

            <div class = "popup_divider"></div>

            <div class = "popup_dropdown_holder">

                <div class = "popup_dropdown_middle">
                    <div class = "popup_dropdown_title">Object Type</div>

                    <div class = "popup_select_holder">
                        <select id = "popup_select_type_selector_obj">
                            <option value="label_greater">Label (Greater)</option>
                            <option value="label_lesser">Label (Lesser)</option>
                            <option value="city_capitals">City (Capital)</option>
                            <option value="city_greater">City (Greater)</option>
                            <option value="city_lesser">City (Lesser)</option>
                            <option value="terrain_greater">Terrain (Greater)</option>
                            <option value="terrain_lesser">Terrain (Lesser)</option>
                        </select>
                    </div>
                </div>

                <div class = "popup_dropdown_middle">
                    <div class = "popup_dropdown_title">Land ID</div>

                    <div class = "popup_select_holder">
                        <select id = "popup_land_selector">

                        </select>
                    </div>
                </div>

            </div>

            <br>

            <div class = "popup_dropdown_holder">
                <div class = "popup_dropdown_middle">
                    <div class = "popup_dropdown_title">Creation (DT)</div>
                    <input id = "creation_time" class = "creation_time_input"/>
                </div>

                <div class = "popup_dropdown_middle">
                    <div class = "popup_dropdown_title">Destruction (DT)</div>
                    <input id = "destruction_time" class = "creation_time_input"/>
                </div>
            </div>

            <br>

            <div class = "popup_dropdown_holder">
                <div class = "popup_dropdown_middle">
                    <div class = "popup_dropdown_title" style = "font-size: 32px;">Title</div>
                    <input class = "creation_title_input"/>
                </div>
            </div>

            <div class = "popup_dropdown_holder">
                <div class = "popup_dropdown_middle">
                    <div id = "popup_create_button" class = "popup_button">
                        Create
                    </div>
                </div>

                <div class = "popup_dropdown_middle">
                    <div id = "popup_close_button" class = "popup_button" style = "background-color: rgb(225,225,225);">
                        Close
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>